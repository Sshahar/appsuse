import { globalState } from "../services/globalState"

const IMG_PATH = globalState.getImgPath()

export function LabelsHeader() {

    const labels = ['primary', 'promotions', 'social', 'updates', 'forums',]

    function _getLabelImgSrc(label) {
        if (label === 'primary') return 'inbox'
        return label
    }

    return (<section className="labels-header">
        <ul className="clean-list">
            {labels.map(label => (
                <li>
                    <img className="icon" src={`${IMG_PATH}/${_getLabelImgSrc(label)}.png`} />
                    <span className="capitalize">{label}</span>
                </li>
            ))}
        </ul>
    </section>
    )
}