import { useSearchParams } from 'react-router';
import Navbar from '../components/Navbar';
import SpecialtiesMenu from '../components/SpecialtiesMenu';
import Footer from '../components/Footer';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') ?? '';
  const tabParam    = searchParams.get('tab') ?? '';

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-lato">
      <Navbar />
      <SpecialtiesMenu searchQuery={searchQuery} defaultTab={tabParam} />
      <Footer />
    </div>
  );
}
