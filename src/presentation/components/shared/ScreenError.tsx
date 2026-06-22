import { Text } from "@/presentation/components/shared";
import error from "@/assets/images/icons/icon-error.svg";

export const ScreenError = () => {
    return (
        <div className="w-full flex justify-center items-center gap-5 flex-col mt-10">
            <img
                src={error}
                alt="Error"
                className="w-10 h-10 mx-auto"
            />

            <Text
                fontType="dm-sans"
                className="text-white text-4xl text-center"
            >
                Something went wrong
            </Text>

            <Text
                fontType="dm-sans"
                className="text-brand-300 text-center text-lg"
            >
                We couldn't connect to the server (API error). Please try again in a few moments.
            </Text>
        </div>
    )
}
