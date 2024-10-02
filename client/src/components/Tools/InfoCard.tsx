import * as React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface InfoCardProps {
    head: string;
    body: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ head, body }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{head}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
