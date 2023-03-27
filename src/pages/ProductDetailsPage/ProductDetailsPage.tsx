import React, {
  useEffect,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { NavLink, useParams } from 'react-router-dom';
import { getDevice } from '../../api/products';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductSlider/ProductsSlider';
import { Device } from '../../types/Device';
import { Product } from '../../types/Product';

import { useLocalStorage } from '../../utils/useLocalStorage';

import './ProductDetailsPage.scss';
import { ProductButtons } from '../../components/ProductButtons/ProductButtons';

export const ProductDetailsPage: React.FC = () => {
  const [products] = useLocalStorage<Product[]>('products', []);
  const params = useParams()['*'] || '';
  const [deviceInfo, setDeviceInfo] = useState<Device | null>(null);

  const device = useMemo(() => {
    return products.find(product => product.phoneId === deviceInfo?.id);
  }, [deviceInfo]);

  const [devicePhoto, setDevicePhoto] = useState(device?.image);

  const fetchDevice = async () => {
    try {
      const deviceFromServer = await getDevice(params);

      setDeviceInfo(deviceFromServer);
    } catch {
      Promise.reject(new Error('error'));
    }
  };

  useEffect(() => {
    fetchDevice();
    setDevicePhoto('');
  }, [params]);

  const changeDeviceByColor = (color: string) => {
    const product = device?.phoneId.split('-');

    product?.splice(-1, 1, color.toLocaleLowerCase());

    return product?.join('-');
  };

  const changeDeviceByCapacity = (capacity: string) => {
    const product = device?.phoneId.split('-');

    product?.splice(-2, 1, capacity.toLocaleLowerCase());

    return product?.join('-');
  };

  return (
    <main className="container">
      <div className="product-details-page">
        <Breadcrumbs />

        <BackButton />

        {device && deviceInfo && (
          <div className="product-details">
            <h2 className="product-details__title">{deviceInfo.name}</h2>
            <div className="product-details__content">
              <div className="product-details__photos">
                {deviceInfo.images.map(photo => (
                  <img
                    src={`new/${photo}`}
                    alt="#"
                    aria-hidden="true"
                    key={photo}
                    className="product-details__set-photo"
                    onClick={() => setDevicePhoto(`new/${photo}`)}
                  />
                ))}
              </div>

              <img
                src={devicePhoto || `new/${device.image}`}
                alt="#"
                className="product-details__photo"
              />

              <div className="product-details__main-info">
                <p className="product-details__colors">
                  Available colors
                  <span className="product-details__colors-content">
                    {deviceInfo.colorsAvailable.map(color => (
                      <NavLink
                        key={color}
                        to={`/${device.category}/${changeDeviceByColor(color)}`}
                        className={classNames(
                          'product-details__button-colors',
                          {
                            'product-details__button-colors--active':
                              device.color === color,
                          },
                          {
                            'product-details__button-colors--rosegold':
                              color === 'rosegold',
                          },
                          {
                            'product-details__button-colors--spacegray':
                              color === 'spacegray',
                          },
                        )}
                        style={{ backgroundColor: `${color}` }}
                        onClick={() => {
                          window.scrollTo({ top: 0 });
                        }}
                      />
                    ))}
                  </span>
                </p>

                <p className="product-details__capacity">
                  Select capacity
                  <span className="product-details__capacity-content">
                    {deviceInfo.capacityAvailable.map(capacity => (
                      <NavLink
                        key={capacity}
                        to={`/${device.category}/${changeDeviceByCapacity(capacity)}`}
                        className={classNames(
                          'product-details__button',
                          'product-details__button-capacity',
                          {
                            'product-details__button-capacity--active':
                              device.capacity === capacity,
                          },
                        )}
                        onClick={() => {
                          window.scrollTo({ top: 0 });
                        }}
                      >
                        {capacity}
                      </NavLink>
                    ))}
                  </span>
                </p>

                <p className="product-details__price">
                  <span className="product-details__current-price">
                    {`$${device.price}`}
                  </span>

                  {device.price !== device.fullPrice && (
                    <span className="product-details__old-price">
                      {`$${device.fullPrice}`}
                    </span>
                  )}
                </p>
                <ProductButtons
                  product={device}
                />
                <br />
                <p className="product-details__data">
                  Screen
                  <span>
                    {deviceInfo.screen}
                  </span>
                </p>
                <p className="product-details__data">
                  Resolution
                  <span>
                    {deviceInfo.resolution}
                  </span>
                </p>
                <p className="product-details__data">
                  Processor
                  <span>
                    {deviceInfo.processor}
                  </span>
                </p>
                <p className="product-details__data">
                  RAM
                  <span>
                    {deviceInfo.ram}
                  </span>
                </p>
              </div>
            </div>

            <div className="product-details__info">
              <div
                className="product-details__about"
                data-cy="productDescription"
              >
                <h2 className="product-details__subtitle">About</h2>
                <br />
                {deviceInfo.description.map(({ title, text }) => (
                  <div key={title}>
                    <h3 className="product-details__title">{title}</h3>
                    <p className="product-details__text">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="product-details__specs">
                <h2 className="product-details__subtitle">Tech specs</h2>
                <br />
                <p className="product-details__data">
                  Screen
                  <span>
                    {deviceInfo.screen}
                  </span>
                </p>
                <p className="product-details__data">
                  Resolution
                  <span>
                    {deviceInfo.resolution}
                  </span>
                </p>
                <p className="product-details__data">
                  Processor
                  <span>
                    {deviceInfo.processor}
                  </span>
                </p>
                <p className="product-details__data">
                  RAM
                  <span>
                    {deviceInfo.ram}
                  </span>
                </p>
                <p className="product-details__data">
                  Built in memory
                  <span>
                    {deviceInfo.capacity}
                  </span>
                </p>
                <p className="product-details__data">
                  Camera
                  <span>
                    {deviceInfo.camera}
                  </span>
                </p>
                <p className="product-details__data">
                  Zoom
                  <span>
                    {deviceInfo.zoom}
                  </span>
                </p>
                <p className="product-details__data">
                  Cell
                  <span>
                    {deviceInfo.cell.join(', ') || '-'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProductsSlider products={products} title="You may also like" />
    </main>
  );
};
