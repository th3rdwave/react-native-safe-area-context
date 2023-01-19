package com.safeareaviewexample;

import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

public class MainActivity extends ReactActivity {

    private static final boolean TEST_TRANSLUCENT_STATUS_BAR = true;
    private static final boolean TEST_TRANSLUCENT_NAVBAR = true;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SafeAreaViewExample";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (TEST_TRANSLUCENT_STATUS_BAR) {
            getWindow().getDecorView().setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        }
        if (TEST_TRANSLUCENT_NAVBAR) {
            getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION,
                WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
        }

    }
}
