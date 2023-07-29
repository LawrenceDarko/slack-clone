import { NextRequest, NextResponse } from "next/server"
import axios from "axios";

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json();
    console.log(data)
    // const response = await axios.post('', {
    //     params: {
    //         username,
    //         email,
    //         password
    // }})
    // const data = await response.data.json()
    // console.log(data)

    return NextResponse.json(data)
}