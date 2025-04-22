import { useState, useEffect } from 'react'
const images = import.meta.glob('/src/assets/*.{webp,png,jpg,jpeg,svg}');

export default function Images(props){
    const [img, setImg] = useState(null)
    
    useEffect(() => {
        const load = async () => {
            const imgKey = '/src/' + props.imgSrc.replace(/^src\//, '')
            if(images[imgKey]) {
                const mod = await images[imgKey]()
                setImg(mod.default)
            }
        }
        load()
    }, [props.imgSrc])

    return (
        <div className="images">
            <img src={img} alt="placeholder" className="esfii" />
        </div>
    )
}