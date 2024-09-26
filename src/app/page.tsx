import styles from "./page.module.css";
import LoginPanel from "./components/login/loginPanel";

export default function Home() {
  return (
    <div className={styles.page}>
        <LoginPanel/>
    </div>
  );
}
