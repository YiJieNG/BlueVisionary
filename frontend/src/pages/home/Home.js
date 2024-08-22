import { useEffect } from 'react';
import BlueNavbar from '../../components/Navbar/BlueNavbar';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import HomeFooter from './HomeFooter';

function Home() {
    document.documentElement.classList.remove("nav-open");
    useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });
    return (
        <>
            <BlueNavbar />
            <HomeHeader />
            <HomeContent />
            <HomeFooter />
        </>
    )
}

export default Home;