import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import Groups2Icon from '@mui/icons-material/Groups2';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
const admin = [
    {
        content: "Category",
        path: "/admin-layout",
        icon:<CategoryIcon/>
    },
    {
        content: "Brand",
        path: "/admin-layout/brand",
        icon:<BrandingWatermarkIcon/>
    },
    {
        content: "Student",
        path: "/admin-layout/student",
        icon:<AccessibilityNewIcon/>
    },
    {
        content: "Teacher",
        path: "/admin-layout/teacher",
        icon:<CastForEducationIcon/>
    },
    {
        content: "Course",
        path: "/admin-layout/course",
        icon:<CoPresentIcon/>
    },
    {
        content: "Group",
        path: "/admin-layout/group",
        icon:<Groups2Icon/>
    }
]
export {admin}