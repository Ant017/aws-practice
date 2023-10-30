import './button.scss'

const Button = ({ type, value, onClick }) => {

    return (
        <div className='button-container'>
            <button className='btn-style'
                type={type}
                onClick={onClick}>
                {value}
            </button>
        </div>
    )
}

export default Button