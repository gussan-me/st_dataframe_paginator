import os
import streamlit.components.v1 as components
import pandas as pd

# Determine whether in development or release mode
_RELEASE = True

# declare_component: use localhost during development, use "dist" folder in release
if not _RELEASE:
    _component_func = components.declare_component(
        "st_dataframe_paginator",
        url="http://localhost:5173",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component(
        "st_dataframe_paginator", path=build_dir
    )

# -----------------------------
# Public API wrapper function
# -----------------------------
def st_dataframe_paginator(
    data: pd.DataFrame,
    page_size: int | None = 10,
    page_size_options: list[int] | None = [10, 25, 50],
    labels: dict[str, str] | None = None,
    key: str | None = None,
):
    """
    A Streamlit component that displays a paginated table from a DataFrame.

    Parameters:
        data (pd.DataFrame): The DataFrame to be displayed.
        page_size (int, optional): Number of rows to display per page. Default is 10.
        page_size_options (list[int], optional): A list of selectable page size options. Default is [10, 25, 50].
        labels (dict[str, str], optional): A dictionary to customize pagination labels.
            Keys: "first", "prev", "next", "last", "displayed_record".
            Example: {"first": "First", "prev": "Previous", "next": "Next", "last": "Last", "displayed_record": "Records displayed:"}

    Example:
        st_dataframe_paginator(df)
    """
    dict_data = data.to_dict(orient="records")
    component_value = _component_func(
        data=dict_data,
        pageSize=page_size,
        pageSizeOptions=page_size_options,
        labels=labels or {}
    )
    return component_value