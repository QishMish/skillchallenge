import { MailOptions } from "@app/types";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MailOptionsDto implements MailOptions{
    @IsOptional()
    @IsString()
    from?: string;
    
    @IsOptional()
    @IsString()
    sender?: string;

    @IsNotEmpty()
    @IsString()
    to: string;

    @IsNotEmpty()
    @IsString()
    subject: string;
    
    @IsNotEmpty()
    @IsString()
    text: string;
    
    @IsOptional()
    @IsString()
    html?: string;

    @IsOptional()
    @IsString()
    @IsIn(["high" , "normal" , "low"])
    priority?: "high" | "normal" | "low";
}