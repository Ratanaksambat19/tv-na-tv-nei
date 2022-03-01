import '../styles/componentsStyle/displayPanel.css'
import oldtv from '../assets/oldtv.png'

const Panel = ({ image }) => {
    return (
        <div className='panel_wrapper'>
            <div className='frame'>
                <img src={image} alt="random cat" />
            </div>
        </div>
    )
}

export default Panel