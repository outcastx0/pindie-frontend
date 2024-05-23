import { AuthForm } from '../components/AuthForm/AuthForm';
import Styles from '../components/AuthForm/AuthForm.module.css';

export default function AuthPage() {
  return (
    <section className={Styles['auth-section']}>
      <AuthForm/>
    </section>
  )
}