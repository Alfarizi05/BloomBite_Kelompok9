
export default function PageHeader({title, breadcrumb, children1, children2, children3}) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <span key={index} className="text-gray-500">
                                {item}
                                {index < breadcrumb.length - 1 && <span className="text-gray-500">/</span>}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>
            <div id="action-button">
                <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg">
                {children1}
		            </button>
                 <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg">
                {children2}</button>
                 <button id="add-button" className="bg-hijau text-white px-4 py-2 rounded-lg">
                {children3}</button>
            </div>
        </div>
    );
}