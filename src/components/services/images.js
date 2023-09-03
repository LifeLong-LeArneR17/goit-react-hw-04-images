import axios from "axios";

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

const KEY = '32926626-9f8218f21c9ddc7b36f942801';
export const photoDataFetch = async (query, page) => {
    const {data} = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return data.hits
}


