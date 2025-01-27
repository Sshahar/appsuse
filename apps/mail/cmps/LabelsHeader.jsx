import { globalState } from "../services/globalState"

const IMG_PATH = globalState.getImgPath()

export function LabelsHeader({ currentLabel, onSetLabel }) {

    function _getLabelImgSrc(label) {
        if (label === 'primary') label = 'inbox'
        return `${IMG_PATH}/${label}${_isSelected(label) ? '-blue' : ''}.png`
    }

    function _isSelected(label) {
        if (label === 'inbox') label = 'primary'
        return currentLabel === label 
    }

    function _getLabelStyle(label) {
        const styles = ['clickable']
        if (_isSelected(label)) styles.push('selected')
        return styles.join(' ')
    }
    
    const labels = ['primary', 'promotions', 'social', 'updates', 'forums',]

    return (<section className="labels-header">
        <ul className="clean-list">
            {labels.map(label => (
                <li key={label} className={_getLabelStyle(label)} onClick={() => onSetLabel(label)}>
                    <img className="icon" src={_getLabelImgSrc(label)} />
                    <span className="capitalize">{label}</span>
                </li>
            ))}
        </ul>
    </section>
    )
}