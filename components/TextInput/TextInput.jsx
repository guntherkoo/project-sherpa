import s from './TextInput.scss';
const TextInput = ({ input, updateInput, input_name, placeholder }) => {
	return (
		<input className={s('input')} 
			type='text' 
			placeholder={ placeholder } 
			value = { input }
			name = { input_name }
			onChange = { e => {	
				let input_value = e.target.value;
				let vlogger_attr = input_name
				updateInput( input_value );
			}}/>
	)
}

export default TextInput;