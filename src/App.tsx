import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useShelbyClient } from '@shelby-protocol/react'
import styles from './App.module.css'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export default function App() {
  const { account, connected, connect, disconnect, wallets } = useWallet()
  const shelbyClient = useShelbyClient()
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const saveTodos = async (updatedTodos: Todo[]) => {
    if (!connected || !account || !shelbyClient) return
    try {
      const blob = new Blob([JSON.stringify(updatedTodos)], { type: 'application/json' })
      const file = new File([blob], 'todos.json', { type: 'application/json' })
      await shelbyClient.upload([file])
    } catch (e) {
      console.error('Shelby save error:', e)
      throw e
    }
  }

  const addTodo = async () => {
    if (!input.trim()) { showToast('⚠️ Tulis task dulu!'); return }
    if (!connected) { showToast('⚠️ Connect wallet dulu!'); return }
    setLoading(true)
    try {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input.trim(),
        completed: false,
        createdAt: Date.now(),
      }
      const updated = [...todos, newTodo]
      setTodos(updated)
      setInput('')
      await saveTodos(updated)
      showToast('✅ Task tersimpan di Shelby!')
    } catch {
      showToast('❌ Gagal simpan, coba lagi')
    } finally {
      setLoading(false)
    }
  }

  const completeTodo = async (id: string) => {
    const updated = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    setTodos(updated)
    try { await saveTodos(updated); showToast('🎉 Status diupdate!') }
    catch { showToast('❌ Gagal update') }
  }

  const deleteTodo = async (id: string) => {
    const updated = todos.filter(t => t.id !== id)
    setTodos(updated)
    try { await saveTodos(updated); showToast('🗑️ Task dihapus!') }
    catch { showToast('❌ Gagal hapus') }
  }

  const total = todos.length
  const done = todos.filter(t => t.completed).length
  const pending = total - done

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <span className={styles.tag}>Shelby Protocol x Aptos</span>
        <h1 className={styles.title}>Aptos<span>Todo</span></h1>
        <p className={styles.subtitle}>// tasks stored on Shelby blob storage</p>
      </header>

      <div className={styles.walletSection}>
        {!connected ? (
          <div>
            {wallets && wallets.length > 0 ? (
              wallets.map(wallet => (
                <button key={wallet.name} className={styles.btnPrimary} onClick={() => connect(wallet.name)}>
                  Connect {wallet.name}
                </button>
              ))
            ) : (
              <button className={styles.btnPrimary} disabled>No Wallet Found</button>
            )}
            <p className={styles.hint}>
              Install <a href="https://petra.app" target="_blank" rel="noreferrer">Petra Wallet</a> untuk mulai
            </p>
          </div>
        ) : (
          <div className={styles.walletBar}>
            <span className={styles.dot} />
            <span className={styles.walletAddr}>
              {account?.address?.toString().slice(0, 6)}...{account?.address?.toString().slice(-4)}
            </span>
            <span className={styles.networkBadge}>
              <span className={styles.networkDot} />SHELBYNET
            </span>
            <button className={styles.btnOutline} onClick={disconnect}>Disconnect</button>
          </div>
        )}
      </div>

      {connected && (
        <div className={styles.inputSection}>
          <p className={styles.sectionLabel}>Tambah Task Baru</p>
          <div className={styles.inputRow}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="Apa yang perlu dikerjakan?"
              maxLength={200} className={styles.input}
            />
            <button className={styles.btnPrimary} onClick={addTodo} disabled={loading}>
              {loading ? '...' : 'Tambah'}
            </button>
          </div>
        </div>
      )}

      {connected && total > 0 && (
        <div className={styles.statsBar}>
          <div className={styles.stat}><span className={styles.statNum}>{total}</span><span className={styles.statLabel}>Total</span></div>
          <div className={styles.stat}><span className={styles.statNum} style={{ color: 'var(--accent2)' }}>{pending}</span><span className={styles.statLabel}>Pending</span></div>
          <div className={styles.stat}><span className={styles.statNum} style={{ color: 'var(--green)' }}>{done}</span><span className={styles.statLabel}>Done</span></div>
        </div>
      )}

      {connected && (
        <div className={styles.listSection}>
          <p className={styles.sectionLabel}>Daftar Task</p>
          {todos.length === 0 ? (
            <div className={styles.empty}><span>📋</span><p>Belum ada task. Tambahkan di atas!</p></div>
          ) : (
            <div className={styles.list}>
              {todos.map(todo => (
                <div key={todo.id} className={`${styles.todoItem} ${todo.completed ? styles.done : ''}`}>
                  <span className={styles.todoText}>{todo.text}</span>
                  <span className={`${styles.badge} ${todo.completed ? styles.badgeDone : styles.badgePending}`}>
                    {todo.completed ? 'done' : 'pending'}
                  </span>
                  <div className={styles.actions}>
                    {!todo.completed && <button className={styles.btnSuccess} onClick={() => completeTodo(todo.id)}>✓</button>}
                    <button className={styles.btnDanger} onClick={() => deleteTodo(todo.id)}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  )
}
