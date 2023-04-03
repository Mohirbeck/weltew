const initialState = {
    banners: [],
    loading: true
}

const mainBanners = (state = initialState, action: any) => {
    switch (action.type) {
        case "getMainBanners":
            return {
                ...state,
                data: action.payload,
                loading: false
            }

        default:
            return state
    }
}

export default mainBanners;