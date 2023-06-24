import { MdStandardIconButton } from "@material/web/iconbutton/standard-icon-button"
import { MdFilledButton } from "@material/web/button/filled-button"
import { MdElevation } from "@material/web/elevation/elevation"
import { MdRipple } from "@material/web/ripple/ripple"
import { MdIcon } from "@material/web/icon/icon"
import { MdTabs } from "@material/web/tabs/tabs"
import { MdTab } from "@material/web/tabs/tab"

import { Swiper } from "swiper/swiper"

// --------------------------------------------------------------------------------

export type WebComponent<T> = Partial<T & React.DOMAttributes<T> & { children: any, ref: any }>

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['md-standard-icon-button']: WebComponent<MdStandardIconButton>
            ['md-filled-button']: WebComponent<MdFilledButton>
            ['md-elevation']: WebComponent<MdElevation>
            ['md-ripple']: WebComponent<MdRipple>
            ['md-icon']: WebComponent<MdIcon>
            ['md-tabs']: WebComponent<MdTabs>
            ['md-tab']: WebComponent<MdTab>

            ['swiper-container']: WebComponent<Swiper>
            ['swiper-slide']: WebComponent<Swiper>
        }
    }
}