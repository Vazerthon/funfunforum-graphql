const getNextLostSoul = ({ lat, lng }, count) => {
  const gap = 1.2;
  const angle = 0.1 * count;
  const spacing = gap * angle;
  const x = lat + spacing * Math.cos(angle);
  const y = lng + spacing * Math.sin(angle);

  return {
    thisLostSoul: { lat: x, lng: y },
    newCount: count + 1,
  };
};

const initialLostSoulLocation = {
  lat: -54,
  lng: -11,
};

const defaultUserLocation = {
  lat: 0,
  lng: 0,
  caption: 'default',
  default: true,
};

const lostSoulFactory = () => {
  let count = 1;

  return {
    getNextLostSoul: () => {
      const { thisLostSoul, newCount } = getNextLostSoul(
        initialLostSoulLocation,
        count,
      );

      count = newCount;

      return {
        ...defaultUserLocation,
        ...thisLostSoul,
        caption: 'Lost at sea',
      };
    },
  };
};

export default lostSoulFactory;
