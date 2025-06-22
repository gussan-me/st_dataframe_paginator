# 📄 Streamlit DataFrame Paginator

A lightweight Streamlit component that displays a **paginated table** for large DataFrames.  
This helps keep your Streamlit apps responsive by showing the data in manageable pages.

---

## ✨ Features

- 🔢 **Pagination**: Displays data with page navigation, improving usability for large DataFrames.
- 🌍 **Multilingual Support**: You can fully customize all pagination labels to any language, including Japanese. For example:

    ```python
    # Japanese
    labels = {
        "first": "最初",
        "prev": "前へ",
        "next": "次へ",
        "last": "最後",
        "displayed_record": "表示行数:"
    }
    # English
    labels={
        "first": "First",
        "prev": "Previous",
        "next": "Next",
        "last": "Last",
    }
    ```

- 📊 **Column Sorting**: Users can click on any column header to sort the table by that column, toggling between ascending and descending order.
- ↔️ **Horizontal Scrolling**: If the DataFrame contains many columns, horizontal scrolling is enabled, so you can easily view all data without layout issues.

---
## Installation
```bash
pip install st_dataframe_paginator
```
## Usage
```python
import streamlit as st
from st_dataframe_paginator import st_dataframe_paginator
import pandas as pd

# Example DataFrame
df = pd.DataFrame({
    "Name": ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank"],
    "Score": [85, 92, 88, 70, 95, 60, 75, 90]
})

# Use the paginator
st_dataframe_paginator(
    df,
    page_size=3,
    page_size_options=[3, 5, 10],
    labels={
        "first": "⏮️ First",
        "prev": "◀️ Previous",
        "next": "Next ▶️",
        "last": "Last ⏭️",
    }
)
```

## Parameters
| Parameter           | Type        | Default        | Description                                 |
|---------------------|-------------|----------------|---------------------------------------------|
| `data`                | DataFrame   | Required       | The DataFrame to paginate                   |
| `page_size`         | int         | `10`           | Number of rows per page                     |
| `page_size_options` | list[int]   | `[10, 20, 50]` | Dropdown options for page size              |
| `labels`            | dict        | Optional       | Custom labels for navigation buttons        |


## Screenshot

![sample](./images/sample.gif)