//block definitions 
Blockly.defineBlocksWithJsonArray([
    {
      type: "mrsidsat's_masterBlock",
      message0: "Setup Simulation with %1 %2 with speed %3 %4 %5 with speed %6 %7 collecting %8 %9",
      args0: [
        {
            type:"input_dummy"
        },
        {
          type: "field_dropdown",
          name: "character1",
          options: [
            [{"src": "public/rabbit.jpg", "width": 25, "height": 25, "alt": "rabbit"}, "rabbit"],
            [{"src": "public/pink_rabbit.jpg", "width": 25, "height": 25, "alt": "Pinkrabbit "}, "pink_rabbit"],
            [{"src": "public/elephant.jpg", "width": 25, "height": 25, "alt": "Elephant"},"elephant"],
            [{"src": "public/monkey.jpg", "width": 25, "height": 25, "alt": "Monkey"},"monkey"]
          ],
        },
        {
            type:"field_input",
            name:"speed1",
            text:"10"
        },
        {
            type:"input_dummy",
        },
        {
            type: "field_dropdown",
            name: "character2",
            options: [
              [{"src": "public/rabbit.jpg", "width": 25, "height": 25, "alt": ""}, "rabbit"],
              [{"src": "public/pink_rabbit.jpg", "width": 25, "height": 25, "alt": "Pink "}, "pink_rabbit"],
              [{"src": "public/elephant.jpg", "width": 25, "height": 25, "alt": "Elephant"},"elephant"],
              [{"src": "public/monkey.jpg", "width": 25, "height": 25, "alt": "Monkey"},"monkey"]
            ],
        },
        {
            type:"field_input",
            name:"speed2",
            text:"10"
        },
        {
            type:"input_dummy",
        },
        {
            type:"field_input",
            name:"numberOfApples",
            text:"10"
        },
        {
            type:"field_image",
            src:"public/apple.jpg",
            width:"25",
            height:"25",
            alt:"*"
        }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 160,
    },
  ]);
  
  //loading toolbox
  const toolbox = {
    kind: "flyoutToolbox",
    contents: [
      {
        kind: "block",
        type: "mrsidsat's_masterBlock",
      },
    ],
  };
  
  //injecting toolbox in workspace
  Blockly.inject("workspace", {
    toolbox: toolbox,
    scrollbars: false,
  });

Blockly.JavaScript["mrsidsat's_masterBlock"] = function (block) {
    
    obj.character1 = block.getFieldValue('character1');
    obj.speed1 = block.getFieldValue('speed1');
    obj.character2 = block.getFieldValue('character2');
    obj.speed2 = block.getFieldValue('speed2');
    obj.numberOfApples = block.getFieldValue('numberOfApples');
    console.log(obj);
    return "startSimulation()";
  };
  //generate code
  const getcode = () => {
    let code = Blockly.JavaScript.workspaceToCode(
      Blockly.common.getMainWorkspace()
    );
  try{
    console.log(code);
    eval(code);
  }
  catch(e){console.log(e);};
    
  };
  