import styles from "./layout.module.css";
import Navbar from "@/components/navigation/Navbar";

export default function WebstoreLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className={styles.contentContainer}>{children}</div>
    </>
  );
}
