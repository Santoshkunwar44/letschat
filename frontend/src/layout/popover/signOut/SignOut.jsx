import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,

} from '@chakra-ui/react'


import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutAction } from '../../../utils/redux/actions/authAction'
import { REMOVE_INTERVAL_ID } from '../../../utils/redux/actions/otherAction'

const SignoutPop = ({ children }) => {
    const disptach = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        disptach(logoutAction(handleAfterLogout))
    }

    const handleAfterLogout = () => {
        disptach(REMOVE_INTERVAL_ID())
        navigate("/signup")
        disptach({ type: "SET_USER_DATA", data: null });
    }

    return (
        <Popover autoFocus={false} >
            <PopoverTrigger>
                <span style={{ cursor: "pointer" }}>{children}</span>
            </PopoverTrigger>
            <PopoverContent >
                <PopoverBody onClick={handleLogout} position={"relative"} zIndex={11} border={"3px solid #37E710"} borderRadius={"8"} p={"8"} py={'5'} display={"flex"} alignItems={"center"} justifyContent={"center"} gap={"10px"} width={"168px"} cursor={"pointer"} bgColor={"#000000"} color="white" height="50px">
                    <img width="30px" src="/icons/signout.png" alt="logoutImg" />
                    <span style={{ fontFamily: "poppins", fontWeight: "700" }}>Sign Out</span>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default SignoutPop