export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? 1;
    const size = searchParams.get('size') ?? 10;
    const sort = searchParams.get('sort') ?? '-published_at';

    const params = new URLSearchParams({
        'page[number]': page,
        'page[size]': size,
        'sort': sort,
    });

    params.append('append[]', 'small_image');
    params.append('append[]', 'medium_image');

    try {
        const response = await fetch(`https://suitmedia-backend.suitdev.com/api/ideas?${params}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('Raw API Response:', JSON.stringify(data, null, 2));

        if (data.data && Array.isArray(data.data)) {
            data.data = data.data.map(item => {
                // console.log('Item structure:', {
                //     id: item.id,
                //     title: item.title,
                //     medium_image: item.medium_image,
                //     small_image: item.small_image,
                //     published_at: item.published_at
                // });

                return item;
            });
        }

        return Response.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch data',
            details: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}