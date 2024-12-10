import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export const useWarmUpBrowser = () => {
    useEffect(() => {
        if (Platform.OS !== 'web') {
            void WebBrowser.warmUpAsync();
            return () => {
                WebBrowser.coolDownAsync();
            };
        }
    }, []);
};
