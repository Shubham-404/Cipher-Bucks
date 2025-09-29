import React from 'react'
import FallingText from '../components/FallingText';

const NotFound = () => {
    return (
        <div className='h-[80svh] w-full flex justify-center items-center p-10 max-md:p-5'>

            <FallingText
                text={"404 NOT FOUND. The page you're looking for does not exist!"}
                highlightWords={["404", "NOT", "FOUND"]}
                highlightClass="highlighted"
                trigger="hover"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.56}
                fontSize="3rem"
                mouseConstraintStiffness={0.9}
            />
        </div>
    )
}

export default NotFound