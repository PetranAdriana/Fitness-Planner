'use client';

import { logout } from '../lib/auth';
import styles from './SignOutButton.module.css';

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button type="submit" className={styles.signOutButton}>
        Sign Out
      </button>
    </form>
  );
}
