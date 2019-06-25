import React from 'react';
import { ImageIcon } from "../Components/Atom";
import { Icons } from "../Shared";

export const SpeedActionNames = {
    UNDO: 'Undo',
    SEND: 'Message',
    DISLIKE: 'Dislike',
    LIKE: 'Like'
}

export const LikeAction = {
    name: SpeedActionNames.LIKE,
    icon: <ImageIcon src={Icons.likeSpecial} />
}

export const SpeedActions = [
    {
        name: SpeedActionNames.DISLIKE,
        icon: <ImageIcon src={Icons.dislikePink} />
    },
    {
        name: SpeedActionNames.SEND,
        icon: <ImageIcon src={Icons.sendPink} />

    },
    {
        name: SpeedActionNames.UNDO,
        icon: <ImageIcon src={Icons.undoGreen} />
    }
]