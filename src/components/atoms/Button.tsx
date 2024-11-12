type buttonProps = {
    variant: "blueBG" | "whiteBG" | "noBGBlue" | "noBGRed" | "noBGWhite";
    buttonText: string;
    onClick: () => void;
}

const variantStyles: { [key in buttonProps['variant']]: string } = {
    blueBG: 'bg-blue text-white font-semibold text-base rounded-xl px-8 h-12 flex justify-center items-center hover:bg-hoverBlue cursor-pointer',
    whiteBG: 'bg-white text-blue border-2 border-darkGrey2 font-semibold text-base rounded-xl px-8 h-12 flex justify-center items-center hover:bg-lightGrey1 cursor-pointer',
    noBGBlue: 'bg-transparent text-blue text-base font-semibold flex justify-center items-center hover:text-hoverBlue cursor-pointer',
    noBGRed: 'bg-transparent text-red text-base font-semibold flex justify-center items-center hover:text-hoverBlue cursor-pointer',
    noBGWhite: 'bg-transparent text-White text-base font-semibold flex justify-center items-center hover:text-hoverBlue cursor-pointer',
};



export default function Button({ buttonText, onClick, variant }: buttonProps) {
    return (
        <div onClick={onClick} className={`${variantStyles[variant]}`}>
            <p>{buttonText}</p >
        </div>
    )
}
