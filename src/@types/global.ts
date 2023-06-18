import { MdFilledButton } from "@material/web/button/filled-button"
import { MdTabs } from "@material/web/tabs/tabs"
import { MdTab } from "@material/web/tabs/tab"
import { MdIcon } from "@material/web/icon/icon"

// --------------------------------------------------------------------------------

type MdComponent<T> = Partial<T & React.DOMAttributes<T> & { children: any, ref: any }>

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['md-filled-button']: MdComponent<MdFilledButton>
            ['md-tabs']: MdComponent<MdTabs>
            ['md-tab']: MdComponent<MdTab>
            ['md-icon']: MdComponent<MdIcon>
        }
    }
}