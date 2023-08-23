import os
import json

# Define the structure of a story
story_template = {
    "title": "Title of the Story",
    "preview": "Preview of the Story...",
    "detail": "Details of the Story Lorem ipsum dolor sit amet..."
}

# Path to the stories directory
stories_directory = os.path.join("assets", "stories")

# Generate and save 10 JSON files
for story_number in range(12, 19):
    story = story_template.copy()
    story["title"] = f"Title of Story {story_number}"
    story["preview"] = f"Preview of Story {story_number}..."
    story["detail"] = f"Details of Story {story_number} Lorem ipsum dolor sit amet..."
    
    json_filename = f"story{story_number}.json"
    json_path = os.path.join(stories_directory, json_filename)
    
    with open(json_path, "w") as json_file:
        json.dump(story, json_file, indent=4)

print("JSON files generated successfully!")
