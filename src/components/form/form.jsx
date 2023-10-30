import './form.scss'

const Form = ({ className, label, type, name, value, placeholder, onChange }) => {
    return (
        <div className={className}>
            <form className='form'>
                <label className='form-label'>{label}</label>
                <input className='form-input'
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} />
                {/* <button type="submit" className="btn-style">Submit</button> */}
            </form>
        </div>
    )
}

export default Form