import { Nav } from "./Nav"
import styles from '../styles/Layout.module.css'
export const Layout = ({children}) => {
  return (
    <>
        <Nav />
        <div className={styles.container}>
            <main className={`${styles.main} columns is-multiline mt-6`}>{children}</main>
            <footer className="footer is-light">
            <p className="has-text-centered">&copy; E Store</p>
            </footer>
        </div>

    </>
  )
}
