import { StyleSheet } from 'react-native';

import { colors } from './colors';
import { sizing } from './core';

export const typo = {
    header: {
        fontFamily: 'Abel_400Regular',
        color: colors.grey[900],
    },

    header1: {
        fontSize: 32,
        color: colors.alpha,
        marginBottom: sizing.baseLine * 2,
    },

    header2: {
        fontSize: 24,
        color: colors.dark,
        marginBottom: sizing.baseLine,
    },

    header3: {
        fontSize: 16,
        marginBottom: sizing.baseLine,
    },

    text: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        color: colors.grey[500],
        marginBottom: sizing.baseLine,
    },

    errorText: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
        color: colors.actions.error,
        marginBottom: sizing.baseLine,
    },
}