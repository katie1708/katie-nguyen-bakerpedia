import { FaStar } from "react-icons/fa";


export default function StarRating(props) {
    const colors= {
        brown: "#A64F21",
        gray: "#EAEAEB"
    }
    const stars = Array(5).fill(0)

    const rating=props.rating;
    
    return(
        <p>
            {stars.map((_,index) => {
                return (
                    <FaStar
                    key={index}
                    size={24}
                    fill={(rating > index) ? colors.brown : colors.gray}
                    />
                )
            })}
        </p>
    )
}