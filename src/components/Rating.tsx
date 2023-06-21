import { memo } from "react"

interface RatingProps {
    rating: number,
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {

    let hue = (rating - 5.5) * 35
    let color: string

    if (hue < 0) {
        color = `hsl(0 80% 45%)`
    } else if (hue > 120) {
        color = `hsl(120 80% 45%)`
    } else {
        color = `hsl(${hue} 80% 45%)`
    }

    const p = rating / 10 * 360
    const rotated = {
        rotate: `${-45 + p}deg`,
        borderTopColor: color,
    }

    const fixed = {
        borderTopColor: rating > 2.5 ? color : 'transparent',
        borderRightColor: rating > 5 ? color : 'transparent',
        borderBottomColor: rating > 7.5 ? color : 'transparent',
    }

    return (
        <div className="rating">
            {rating > 2.5
                ?
                <div className="halfcircle" style={rotated} />
                :
                <div className="right-container">
                    <div className="halfcircle" style={rotated} />
                </div>}
            <div className="halfcircle" style={fixed} />
            <div className="rating-text">{rating.toFixed(1)}</div>
        </div>
    )
}

export default Rating