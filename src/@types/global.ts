import { MdFilledButton } from "@material/web/button/filled-button"
import { MdTabs } from "@material/web/tabs/tabs"
import { MdTab } from "@material/web/tabs/tab"
import { MdIcon } from "@material/web/icon/icon"
import { MdElevation } from "@material/web/elevation/elevation"
import { Swiper } from "swiper/swiper"

// --------------------------------------------------------------------------------

export type WebComponent<T> = Partial<T & React.DOMAttributes<T> & { children: any, ref: any }>

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['md-filled-button']: WebComponent<MdFilledButton>
            ['md-tabs']: WebComponent<MdTabs>
            ['md-tab']: WebComponent<MdTab>
            ['md-icon']: WebComponent<MdIcon>
            ['md-elevation']: WebComponent<MdElevation>
            ['swiper-container']: WebComponent<Swiper>
            ['swiper-slide']: WebComponent<Swiper>
        }
    }
}