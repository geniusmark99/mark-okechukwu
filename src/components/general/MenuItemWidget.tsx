interface MenuItemProps {
    number: number
    title: string

}

const MenuItemWidget = ({ number, title }: MenuItemProps) => {
    return (
        <div className={`flex group items-center justify-between w-full max-w-3xl mx-auto my-2`}>
            <div className={`size-16 flex items-center justify-center rounded-full border-2 bg-black  border-white text-white`}>
                {number}
            </div>
            <div className={`group-hover:flex-1 transition-[flex] cursor-pointer whitespace-nowrap h-16 rounded-full justify-center items-center py-3 px-6 text-center text-xl font-medium  duration-300 
         bg-transparent text-white border-2 border-white`}>
                {title}
            </div>
            <div className={`size-16 transition-all text-2xl group-hover:-rotate-45 flex items-center justify-center rounded-full 
         bg-transparent border-2 border-white  text-white`}>
                {'↓'}
            </div>
        </div>
    )
}

export default MenuItemWidget;
