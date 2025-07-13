import { useState } from 'react';

export default function IdeaCard({ idea }) {
    const { title, published_at, medium_image, small_image } = idea;
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Fungsi untuk mendapatkan URL gambar yang valid
    const getImageUrl = () => {
        if (medium_image) {
            if (Array.isArray(medium_image) && medium_image.length > 0) {
                return medium_image[0]?.url || medium_image[0];
            }
            if (typeof medium_image === 'string') {
                return medium_image;
            }l
            if (medium_image.url) {
                return medium_image.url;
            }
        }

        if (small_image) {
            if (Array.isArray(small_image) && small_image.length > 0) {
                return small_image[0]?.url || small_image[0];
            }
            if (typeof small_image === 'string') {
                return small_image;
            }
            if (small_image.url) {
                return small_image.url;
            }
        }

        return null;
    };

    const imageUrl = getImageUrl();

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg">
            <div className="relative w-full h-48 mb-3 rounded overflow-hidden bg-gray-200">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {imageError ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-500">
                            <div className="text-2xl mb-2">📷</div>
                            <p className="text-xs">Gambar tidak tersedia</p>
                        </div>
                    </div>
                ) : imageUrl ? (
                    <img
                        src={imageUrl} // Gambarnya tidak muncul karena ERR_BLOCKED_BY_ORB = Blocking yang dilakukan oleh browser dalam tujuan sistem keamanan
                        alt={title}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                            }`}
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-500">
                            <div className="text-2xl mb-2">📷</div>
                            <p className="text-xs">Tidak ada gambar</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Debug info*/}
            {/* <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-50 rounded">
                <p>Image URL: {imageUrl || 'No URL'}</p>
                <p>Medium Image: {JSON.stringify(medium_image)}</p>
                <p>Small Image: {JSON.stringify(small_image)}</p>
            </div> */}

            <div className='p-5'>
                <p className="text-xs text-gray-500 uppercase mb-1">
                    {new Date(published_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
                <h2 className="text-sm font-semibold line-clamp-3">{title}</h2>
            </div>
        </div>
    );
}