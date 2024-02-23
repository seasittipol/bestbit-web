const primary = 'bg-amber-500 text-black px-4 py-1 rounded-lg font-semibold'
const secondary = 'bg-gray-500 text-black px-4 py-1 rounded-lg font-semibold'
const green = 'bg-green-500 text-black px-4 py-1 rounded-lg font-semibold'
const red = 'bg-red-500 text-black px-4 py-1 rounded-lg font-semibold'

export default function Button(props) {
    const { bg, color, name, onClick, value, symbol, height } = props
    let finalClassName = ''
    if (bg === 'amber') {
        finalClassName += primary
    } else if (bg === 'green') {
        finalClassName += green
    } else if (bg === 'red') {
        finalClassName += red
    } else {
        finalClassName += secondary
    }
    if (height) {
        finalClassName += ` h-[${height}px]`
    }
    return (
        <button className={finalClassName} name={symbol} value={value} onClick={onClick}>{name}</button>
    )
}
