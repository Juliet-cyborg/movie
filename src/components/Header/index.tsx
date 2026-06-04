import logo from '../../../public/logo.png'

export const Header = () => {
    return (
        <div className='header'>
            <img src={logo} alt="logo" />
            <h2 className='app-subtitle'>It's time for popcorn! Find your next movie here.</h2>
        </div>
    );
};

