import classnames from 'classnames'

import { Image } from '../images'
import { useEffect, useState } from 'react'
import { usePage } from '@polocas/core/context'

import styles from './BannerCarousel.module.scss'

function getRandomPhoto(list, current) {
  const allowed = list.map(photo => photo.id).filter(photo => photo !== current)
  const number = Math.floor(Math.random() * allowed.length)
  return allowed[number]
}

const PHOTO_TIMEOUT = 10000

export const BannerCarousel = ({ className }) => {
  const { showPhotoList } = usePage()
  if (!showPhotoList) {
    return null
  }
  const list = showPhotoList
  console.log(list)
  const [backgroundPhoto, setBackgroundPhoto] = useState(list[0].id)
  useEffect(() => {
    const timeout = setTimeout(
      () => setBackgroundPhoto(getRandomPhoto(list, backgroundPhoto)),
      PHOTO_TIMEOUT
    )
    return () => {
      clearTimeout(timeout)
    }
  }, [list, backgroundPhoto])
  return (
    <div className={classnames(styles.carousel, className)}>
      <div className={styles.inner}>
        {list.map(photo => (
          <Image
            className={classnames(styles.photo, {
              [styles.visible]: photo.id === backgroundPhoto,
            })}
            size="horizon"
            key={photo.id}
            onClick={() => setBackgroundPhoto(photo.id)}
            image={photo.image}
          />
        ))}
      </div>
    </div>
  )
}

BannerCarousel.displayName = 'BannerCarousel'
