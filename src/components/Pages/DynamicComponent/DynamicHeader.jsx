const DynamicHeader = ({mainHeader,subHeaderName}) => {
    return (
        <div className='flex flex-col gap-2 mb-4'>
            <h1 className='text-3xl font-semibold'>{mainHeader}</h1>
            <h1>{subHeaderName}</h1>
        </div>
    );
};

export default DynamicHeader;