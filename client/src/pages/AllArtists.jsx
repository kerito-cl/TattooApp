import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import StarRating from '../components/StarRating'
import { useAppContext } from '../context/AppContext'
import backgroundImage from '../assets/tattoo_studio_bg.png'

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
    <input type="radio" name='sortOption' checked={selected} onChange={() => onChange(label)} />
    <span className='font-light select-none'>{label}</span>
  </label>
);

const AllArtists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { artists, navigate, currency } = useAppContext();

  const [selectedFilters, setSelectedFilters] = useState({ styles: [], priceRange: [] });
  const [selectedSort, setSelectedSort] = useState('');
  const [openFilters, setOpenFilters] = useState(false); // ✅ filter toggle

  const styleOptions = ["Black & Grey", "Neo-Traditional", "Realism", "Japanese", "Minimalist", "Horror"];
  const priceRanges = ["0 to 50", "50 to 100", "100 to 200", "200 to 300"];
  const sortOptions = ["Price Low to High", "Price High to Low", "Newest First"];

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (checked) updated[type].push(value);
      else updated[type] = updated[type].filter(item => item !== value);
      return updated;
    });
  };

  const handleSortChange = (option) => setSelectedSort(option);

  const matchesStyle = (artist) =>
    selectedFilters.styles.length === 0 || artist.styles.some(style => selectedFilters.styles.includes(style));

  const matchesPrice = (artist) =>
    selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some(range => {
      const [min, max] = range.split(' to ').map(Number);
      return artist.pricePerHour >= min && artist.pricePerHour <= max;
    });

  const sortArtists = (a, b) => {
    if (selectedSort === 'Price Low to High') return a.pricePerHour - b.pricePerHour;
    if (selectedSort === 'Price High to Low') return b.pricePerHour - a.pricePerHour;
    if (selectedSort === 'Newest First') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  };

  const filterByLocation = (artist) => {
    const city = searchParams.get('city');
    if (!city) return true;
    return artist.studio.address.toLowerCase().includes(city.toLowerCase());
  };

  const filteredArtists = useMemo(() => {
    return artists
      .filter(a => matchesStyle(a) && matchesPrice(a) && filterByLocation(a))
      .sort(sortArtists);
  }, [artists, selectedFilters, selectedSort, searchParams]);

  const clearFilters = () => {
    setSelectedFilters({ styles: [], priceRange: [] });
    setSelectedSort('');
    setSearchParams({});
  };

  return (
    <div
      className='relative min-h-screen pt-28 px-4 md:px-16 lg:px-24 xl:px-32 bg-cover bg-center'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='absolute inset-0 bg-black/60 z-0' />

      <div className='relative z-10 flex flex-col-reverse lg:flex-row items-start justify-between'>

        {/* MAIN LIST */}
        <div className='w-full lg:w-2/3'>
          <div className='text-left'>
            <h1 className='text-4xl font-bold text-white'>Book a Tattoo Artist</h1>
            <p className='text-sm text-gray-300 mt-2 max-w-2xl'>
              Explore top-rated artists, book a session, and bring your next piece to life.
            </p>
          </div>

          {filteredArtists.map((artist) => (
            <div key={artist._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-700 last:border-0'>
              <img
                onClick={() => { navigate(`/studios/${artist._id}`); scrollTo(0, 0); }}
                src={artist.images[0]} alt='artist' title='View Artist'
                className='w-full md:w-1/2 h-60 rounded-xl object-cover shadow-lg cursor-pointer'
              />

              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-red-400 uppercase text-xs font-medium'>{artist.styles.join(', ')}</p>
                <p
                  className='text-2xl font-semibold text-white cursor-pointer hover:underline'
                  onClick={() => { navigate(`/studios/${artist._id}`); scrollTo(0, 0); }}
                >
                  {artist.name}
                </p>
                <div className='flex items-center'>
                  <StarRating />
                  <p className='ml-2 text-gray-400 text-sm'>120+ reviews</p>
                </div>
                <div className='flex items-center gap-1 text-gray-400 mt-2 text-sm'>
                  <img src={assets.locationIcon} alt="location" />
                  <span>{artist.studio.address}</span>
                </div>

                <p className='text-xl font-medium text-white mt-4'>${artist.pricePerHour} / hour</p>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className='bg-transparent text-gray-300 w-full lg:w-80 p-5 rounded-xl shadow-md mb-10 lg:mb-0'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-white font-semibold'>Filters</h3>
            <div className='text-sm text-red-400 cursor-pointer'>
              <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                {openFilters ? 'Hide' : 'Show'}
              </span>
              <span className='hidden lg:inline hover:underline' onClick={clearFilters}>
                Clear
              </span>
            </div>
          </div>

          <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
            <div className='mb-6'>
              <p className='font-medium text-white mb-2'>Tattoo Style</p>
              {styleOptions.map((style, i) => (
                <CheckBox key={i} label={style} selected={selectedFilters.styles.includes(style)}
                  onChange={(checked) => handleFilterChange(checked, style, 'styles')} />
              ))}
            </div>

            <div className='mb-6'>
              <p className='font-medium text-white mb-2'>Price Range</p>
              {priceRanges.map((range, i) => (
                <CheckBox key={i} label={`$${range}`} selected={selectedFilters.priceRange.includes(range)}
                  onChange={(checked) => handleFilterChange(checked, range, 'priceRange')} />
              ))}
            </div>

            <div>
              <p className='font-medium text-white mb-2'>Sort By</p>
              {sortOptions.map((opt, i) => (
                <RadioButton key={i} label={opt} selected={selectedSort === opt}
                  onChange={() => handleSortChange(opt)} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AllArtists;
