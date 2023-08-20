
import VideoComponent from '@/components/cards/VideoComponent';
import { fetchUser } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function Home() {
    const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
    
    return (
        <VideoComponent/>
    );
}