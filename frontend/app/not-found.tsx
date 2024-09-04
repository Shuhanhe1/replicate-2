import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container className='mt-8'>
      <h2>Not Found</h2>
      <p className='mb-2'>Could not find requested resource</p>
      <Link href='/'>
        <Button>Return Home</Button>
      </Link>
    </Container>
  );
}
