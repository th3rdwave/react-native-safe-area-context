package com.th3rdwave.safeareacontext

import java.util.*

data class SafeAreaViewLocalData(
    val insets: EdgeInsets,
    val mode: SafeAreaViewMode,
    val edges: SafeAreaViewEdges,
)
