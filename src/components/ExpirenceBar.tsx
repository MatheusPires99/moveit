import styles from '../styles/components/ExpirienceBar.module.css';

export function ExpirenceBar() {
  return (
    <header className={styles.expirienceBar}>
      <span>0 xp</span>

      <div>
        <div style={{ width: '60%' }} />

        <span className={styles.currentExpirience} style={{ left: '60%' }}>
          300px
        </span>
      </div>

      <span>600 xp</span>
    </header>
  )
}
